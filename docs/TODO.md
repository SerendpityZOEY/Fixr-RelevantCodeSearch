# TODO List

#### Search Panel
- :white_check_mark: add/remove/modify options for import feature search
- :white_check_mark: add/remove/modify options for callsites feature search

#### Visualize
- Syntax highlighting code snippet(child patch content):
    - :white_check_mark: highlight lines with +/- symbols
    - :white_check_mark: mark the lines that has code being folded
    - retrieve link to github for entire view of source code (github.com/+repo_sni+c_hash_sni)
    - retrieve link to github for the view of parent node (github.com/+repo_sni+p_hash_sni)
    - highlight the methods in 'c_methods_t' field
    - :white_check_mark: Add repo and file name as title for each commit
    - :white_check_mark: count additions and deletions, add as description under each title
    - :white_check_mark: Add commit messages as subtitle for each commit (c_subject_t)
- For search query with api calls:
    - :white_check_mark: hightlight search query (api calls), display the lines around this line and collapse the rest of patch.
    - Some api call doesn't exist in patch, create a separate code snippet for lines around api call.
- Others:
    - put search panel in side bar or expand right side when scrolling down.
    
#### Others
- Deployment
- Once search is clicked for the first time, solr connector will keep connection to solr for real-time search purpose, however, this leads to the deplay of typing later on, since it will send a search query everytime a letter is enterered. Possible solutions:
    - Stop the connection once results is fetched and start connection by click the button
    - Make a list of frequent searched or interested callsites/imports into a dropdown to select instead of type.
- Task Tracking tools: I have a simple firebase app for todo list tracking, [Go to the app](https://ohmywebsite.firebaseapp.com/apps/todosList/). Maybe useful once the priority is determined. I can create a new database and move this list to it. 
    