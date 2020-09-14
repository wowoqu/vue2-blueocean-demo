pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm config get registry'
        echo '-----  test  -----'
        sh 'npm config set registry http://registry.npm.taobao.org'
        sh 'npm install'
      }
    }

  }
}