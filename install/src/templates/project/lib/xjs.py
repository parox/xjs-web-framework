import sys
import os
import shutil

examplesFolder = "/etc/pxweb/examples"

def project():
    # Create structure folder for project
    try:
        projectName = sys.argv[2]
        projectExample = examplesFolder+"/project"
        newProject = os.getcwd()+"/"+projectName
        
        shutil.copytree(projectExample, newProject)
        
    except:
        print "project error"

def fullProject():
    # Create structure folder for project
    try:
        projectName = sys.argv[2]
        projectExample = examplesFolder+"/fullProject"
        newProject = os.getcwd()+"/"+projectName
        
        shutil.copytree(projectExample, newProject)
        
    except:
        print "fullProject error"

def app():
    try:
        appName = sys.argv[2]
        appExample = examplesFolder+"/app"
        newApp = os.getcwd()+"/"+appName
        
        shutil.copytree(appExample, newApp)
        
    except:
        print "app error"

def fullApp():
    try:
        appFullName = sys.argv[2]
        appFullExample = examplesFolder+"/appFull"
        newAppFull = os.getcwd()+"/"+appFullName
        
        shutil.copytree(appFullExample, newAppFull)
        
    except:
        print "fullApp error"


def transaction():
    pass

def validation():
    pass

def internationalization():
    pass


comands = {
    "project" : project,
    "app" : app,
    "fullapp" : fullApp,
    "fullproject" : fullProject,
    "transaction" : transaction,
    "validation" : validation,
    "internationalization" : internationalization,
}

action = sys.argv[1]

try:
    comands[action]()
except:
    print "action erro"
