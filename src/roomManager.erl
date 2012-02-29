-module(roomManager).
-export([start/0]).

%%-record(topicChain, {topic, chain}).

start()->
    io:format("roomManager, at your service~n"),
    loop().

askJoin(T, {Pid, Email})->
    T ! {join, Pid, Email},
    receive
	{T, ok}->
	    ok
    end.

loop()->
    receive
	{Pid, {join, {Email, Topic}}}->
	    case get(Topic) of
		undefined->
		    io:format("spawning a new room for:~p~n", [Topic]),				    T = spawn(fun() -> room:start(Topic) end),
		    put(Topic, {T, 1});
		{none, N}->
		    io:format("spawning a new room for:~p~n", [Topic]),				    T = spawn(fun() -> room:start(Topic) end),
		    put(Topic, {T, N + 1});
		{T, N} ->
		    put(Topic, {T, N + 1})
	    end,
	    case askJoin(T, {Pid, Email}) of
		ok ->
		    loop()
	    end;
	{Pid, detach, Topic}->
	    io:format("room detached:~p~n",[Pid]),
	    {_T, Num} = get(Topic),
	    put(Topic, {none, Num}),
	    loop();
	{quit, Topic} ->
	    {T, Num} = get(Topic),
	    put(Topic, {T, Num - 1}),
	    if
		Num - 1 == 0->
		    erase(Topic)
	    end,
	    loop()
    end.
