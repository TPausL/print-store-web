@Library('teckdigital') _
def appName = 'print-store-web'
def localBranchToGitopsValuesPath = [
    'main': 'print-management/workloads/store/deployment.yml',
]
pipeline {
    agent {
        kubernetes {
            inheritFrom 'kaniko-template'
        }
    }
    environment {
        PUBLIC_API_HOST  = credentials('PUBLIC_API_HOST')
    }

    stages {
        stage('Build and Tag Image') {
            steps {
                container('kaniko') {
                    script {
                        withCredentials([
                            string(credentialsId: 'PUBLIC_API_HOST', variable: 'PUBLIC_API_HOST'),
                        ]) {
                            buildDockerImage(additionalImageTags: ['latest'],
                                buildArgs: [
                                    "PUBLIC_API_HOST=${PUBLIC_API_HOST}"
                                ])
                        }
                    }
                }
            }
        }

        stage('Update GitOps') {
            when {
                expression {
                    return localBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                }
            }
            steps {
                script {
                    def valuesPath = localBranchToGitopsValuesPath[getLocalBranchName()]
                    updateGitops(appName: appName, valuesPath: valuesPath, credentialsId: 'tpausl-github-user', gitOpsRepo: 'https://github.com/tpausl/gitops.git', fileTypeToChange: 'deployment', containerName: 'print-assist')
                }
            }
        }
    }
}
