import * as core from '@actions/core'
import AWS from 'aws-sdk'

const triggerAWSCodePipeline = (): void => {
  const awsRegion = core.getInput('aws-region')
  const awsAccessKey = core.getInput('aws-access-key')
  const awssecretKey = core.getInput('aws-secret-key')
  const pipelineName = core.getInput('pipeline-name')

  AWS.config = new AWS.Config()
  AWS.config.region = awsRegion
  AWS.config.credentials = {
    accessKeyId: awsAccessKey,
    secretAccessKey: awssecretKey
  }

  const codepipeline = new AWS.CodePipeline()
  const pipeline = {
    name: pipelineName
  }

  codepipeline.startPipelineExecution(pipeline, (error, okData) => {
    if (error) {
      core.setFailed(error)
    } else {
      core.info('AWS CodePipeline triggered successfully')
      core.info('The following execution ID was returned')
      core.info(okData.pipelineExecutionId || '')
      core.setOutput('pipelineExecutionId', okData.pipelineExecutionId || '')
    }
  })
}

export {triggerAWSCodePipeline}
