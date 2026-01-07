pipeline {
    agent any
    tools {
        jdk 'JDK25'
    }

    stages {
        stage('Test') {
            steps {
                sh 'chmod +x BuilderService/mvnw UserService/mvnw'
                sh 'cd BuilderService && ./mvnw clean test'
                sh 'cd UserService && ./mvnw clean test'
            }
        }
    }

    post {
        success {
            echo '✅ Test Pipeline Completed Succesfully!'
            echo 'Displaying Test Reports Below... ⬇️'
            junit '**/target/surefire-reports/*.xml'
        }
        failure {
            echo '❌ Pipeline Failed!'
            junit '**/target/surefire-reports/*.xml'
        }
    }
}