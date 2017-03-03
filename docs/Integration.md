# Frontend-backend (services) interface

A requirement is that the frontend (the UI) should:
- be agnostic from the kind of data available in the backend.
- not perform any program parsing, manipulation, transformation, ...
  but just focus on the interaction with the user. Thus, all the hard
  work is delegated to the backend.

The goal of this document is to define the services that the frontend
needs to invoke to gather the needed data.

We first define the requirements of the user interface, and define the
precise interface of the service (e.g. list of endpoints, format of
the precise input/output, error handling) later.


## Requirements of the UI

What are the actions performed by the UI that should be provided by the backend?

### Components of the UI
We identify these compnoents of the UI:
a. Query panels
b. Tiles panels
c. Source code visualization


### List of requirements

#### *Search*

The search is triggered by the "search button". Pressing search sends
a new query to the backend and gets back the results.

Input:
  - Query: what is a query?
    - Text contained in the query panel
    - In principle, other constraints: e.g. the time interval selected
      for the results (e.g. from 1/1/2014 to 1/1/2016), a given
      repo, only the repos with at least xyz stars...

Output:
  - Results of the search:
    - An ordered (by rank) list of tiles:
    - Each tile in the list should specify:
      - the type of the tile (the UI must know 
      - the specific content for the tile
      
Examples of tiles

Graph-iso tile (I would call it pattern tile):
- It shows a pattern
- It has a list of pairs (source codes file/method) that contains the pattern

Relevant commit tiles:
- It has an ordered list of commits found by the query and the relevant code search


#### *Query update* 
The query update is triggered by:
  1. Selecting different source code lines from the search 
  2. Pressing the "Fix" button on a tile (specific for each tile)


Source code selection

Input:
  - Selection of the source code: multiple lines as a list of strings
  - Reference to the filename (user/repo/hash/file)
  - Current Query (Do we need this?)
  *NOTE*: we probably want stateless services.

Output:
  - New query

Additional: needs "live" feedback? E.g. I press a method name and the highlighting of the code changes?


"Fix" button on a tile
Input:
  - Query
  - TBD
  
Output:
  - New query

  

#### *Update shown source code*

Pressing the "Details" button on a tile update the source code shown by the UI.

Input:
  - Type of tile
  - Necessary contents of selected tile: (user/repo/hash/file)

Output:
  - List of source code to show