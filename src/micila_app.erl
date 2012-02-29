-module(micila_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    Options = [
	       {port, 80},
	       {static, "./static"},
	       {loop, fun(Req) -> micila:handle_http(Req) end},
	       {ws_loop, fun(Ws) -> micila:handle_websocket(Ws) end},	       {ws_autoexit, false}
	      ],
    micila_sup:start_link(Options).

stop(_State) ->
    ok.


