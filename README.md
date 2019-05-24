# Finanzbuchhaltung

Simple accounting web application using DBF files.

## History of underlying accounting concept

My father created the underlying accounting software concept toghether with my mother in the late 80s using Clipper with DBF-files as persistence layer. Perhaps you know the MS-DOS like blue screens with no mouse interactions? Nowadays I saw such screens in old cash register systems. This project gives this application a new user interface and lets it run on a JVM to get off the retro island.

The tech company my parents worked at went bankrupt in 1992. Since then my parents run a sewing company and continue to use their accounting software. The application survived six tax audits in Poland and Germany. Each government auditor was pleased with its simplicity and could complete his audit quickly.

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server

## License

Eclipse Public License - v 2.0
