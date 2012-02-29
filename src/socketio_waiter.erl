-module(socketio_waiter).
-include_lib("./deps/socket.io-erlang/include/socketio.hrl").
-compile(export_all).
-behaviour(gen_event).

-export([init/1, handle_event/2, handle_call/2, handle_info/2,
          terminate/2, code_change/3]).

%% gen_event
init([]) ->
    io:format("initialized!~n"),
    {ok, 0}.

handle_event({client, Pid}, State) ->
    io:format("Connected: ~p~n",[State]),
    EventMgr = socketio_client:event_manager(Pid),
    ok = gen_event:add_handler(EventMgr, ?MODULE,[]),
    {ok, State + 1};
handle_event({disconnect, Pid}, State) ->
    io:format("Disconnected: ~p~n",[Pid]),
    {ok, State};
handle_event({message, Client, #msg{ content = Content } = Msg}, State) ->
    io:format("Got a message: ~p from ~p~n",[Content, Client]),
    socketio_client:send(Client, #msg{ content = "hello!" }),
    socketio_client:send(Client, #msg{ content = [{<<"echo">>, Content}], json = true}),
    {ok, State};
handle_event(_E, State) ->
    {ok, State}.

handle_call(_, State) ->
    {reply, ok, State}.

handle_info(_, State) ->
    {ok, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

