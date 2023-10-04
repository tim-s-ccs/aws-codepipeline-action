import * as core from '@actions/core'
import {triggerAWSCodePipeline} from './trigger-aws-codepipeline'

const run = async (): Promise<void> => {
  try {
    const awsRegion = core.getInput('aws-region')
    const awsAccessKey = core.getInput('aws-access-key')
    const awsSecretKey = core.getInput('aws-secret-key')
    const pipelineName = core.getInput('pipeline-name')

    await triggerAWSCodePipeline(
      awsRegion,
      awsAccessKey,
      awsSecretKey,
      pipelineName
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
