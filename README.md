[![Clojars Project](https://img.shields.io/clojars/v/de.switajski.finanzbuchhaltung.svg)](https://clojars.org/de.switajski.finanzbuchhaltung)

# Finanzbuchhaltung

![logo](https://raw.githubusercontent.com/switajski/finanzbuchhaltung/master/logo-files/Original-400x400px.png)

Simple accounting web application using DBF files.

## History of underlying accounting concept

My father created the underlying accounting software concept toghether with my mother in the late 80s using Clipper with DBF-files as persistence layer. Perhaps you know the MS-DOS like blue screens with no mouse interactions? My garage where I have my car repaired has still such a system and cool user interface. 

The tech company my parents worked at went bankrupt in 1992. Since then my parents run a sewing company and continue to use their accounting software. The application survived six tax audits in Poland and Germany. Each government auditor was pleased with its simplicity and could complete his audit quickly. 

Now this system has to get out of the retro island of technologies!

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server
    
To start the frontend, run:

    cd resources/public
    yarn install
    yarn start

## License

Eclipse Public License - v 2.0
