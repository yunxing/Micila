#! /usr/bin/env escript
%%! -pa ./ebin ./deps/socket.io-erlang/ebin ./deps/socket.io-erlang/deps/misultin/ebin ./deps/socket.io-erlang/deps/ossp_uuid/ebin ./deps/socket.io-erlang/deps/jsx/ebin -config elog

-mode(compile).
-compile(export_all).


main(_)->
    appmon:start(),
    io:format("web server started~n"),
    application:start(sasl),
    application:start(micila),
    receive _ -> ok end.
