pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:16.17'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm config get registry'
        echo '-----  test  -----'
        sh 'npm config set registry http://registry.npm.taobao.org'
        sh 'npm install'
        sh 'export NODE_OPTIONS=--openssl-legacy-provider'
        sh 'npm run build'
        sh 'pwd'
        sh 'ls -alh'
        sh 'git --version'
        sh 'git log'
      }
      post {
        success {
          dingtalk(
            robot: "93699c3f-0a3e-4421-a03c-5ce3b4c4991b", 
            type: "ACTION_CARD", 
            atAll: true,
            title: "构建成功: ${env.JOB_NAME}",
            text: [
              "### [${env.JOB_NAME}](${env.JOB_URL}) ",
              "---",
              "- 任务: [${currentBuild.displayName}](${env.BUILD_URL})",
              "- 状态: <font color=#00CD00 >成功</font>",
              "- 持续时间: ${currentBuild.durationString}".split("and counting")[0],
              "- 执行人: ${BUILD_USER} ${env.CHANGE_AUTHOR_DISPLAY_NAME}",
            ]
          )
        }
      }
    }
  }
}