from git import Repo
import os, json, pysolr

join = os.path.join

# rorepo is a Repo instance pointing to the git-python repository.
# For all you know, the first argument to Repo is a path to the repository
# you want to work with
repo = Repo("../../book")
assert not repo.bare

repo.config_reader()
cw = repo.config_writer()
cw.release()

print repo.commit("master")
fifty_first_commits = list(repo.iter_commits('master', max_count=50))
print fifty_first_commits


response = []
for i in range(1,50):
    commit = fifty_first_commits[i]
#    print commit.message
    response.append({'commit': commit.message,'committerName': commit.committer.name,'authorName: ': commit.author.name})

print json.dumps(response)


with open('items.json', 'w+') as outfile:
    json.dump(response, outfile)


solr = pysolr.Solr('http://localhost:8983/solr/gettingstarted_shard1_replica1', timeout=10)

items = json.load(open('items.json'))
for item in items:
  item['id'] = item['commit']

solr.add(items)


#headcommit = repo.head.commit
#print headcommit.message


