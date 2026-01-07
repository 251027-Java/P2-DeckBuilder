pipeline {
    agent any

    tools {
        jdk 'JDK25'
    }

    stages {
        stage('Test') {
            steps {
                sh 'chmod +x BuilderService/mvnw UserService/mvnw'

                sh '''
                    cd BuilderService
                    ./mvnw clean test
                '''

                sh '''
                    cd UserService
                    ./mvnw clean test
                '''
            }
        }
    }

    post {
        always {
            echo '📊 Publishing test results'
            junit allowEmptyResults: true,
                  testResults: '**/target/surefire-reports/*.xml'
        }
    }
}