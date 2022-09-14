import * as core from '@actions/core'
import AWS from 'aws-sdk'

const triggerAWSCodePipeline = (
  awsRegion: string,
  awsAccessKey: string,
  awssecretKey: string,
  pipelineName: string
): void => {
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
