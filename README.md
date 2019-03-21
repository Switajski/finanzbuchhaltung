# Finanzbuchhaltung

Simple accounting web application using DBF files.

## History of underlying accounting concept

My father created the underlying accounting software concept toghether with my mother in the late 80s using Clipper with DBF-files as persistence layer. Perhaps you know the MS-DOS like blue screens with no mouse interactions? Some cash register systems nowadays still are still running in such an environment. Now, the application could need a new user interface.

The tech company my parents were working at went bankrupt in 1992. Since then they run a sewing company and continued to use their accounting software. The application survived six tax audits in Poland and Germany. Each government auditor was pleased with its simplicity and could complete his audit quickly.

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server
