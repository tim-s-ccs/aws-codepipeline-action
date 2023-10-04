import * as core from '@actions/core'
import {
  CodePipelineClient,
  StartPipelineExecutionCommand
} from '@aws-sdk/client-codepipeline'

const triggerAWSCodePipeline = async (
  awsRegion: string,
  awsAccessKey: string,
  awsSecretKey: string,
  pipelineName: string
): Promise<void> => {
  const client = new CodePipelineClient({
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey
    }
  })

  const command = new StartPipelineExecutionCommand({
    name: pipelineName
  })

  try {
    const response = await client.send(command)

    core.info('AWS CodePipeline triggered successfully')
    core.info('The following execution ID was returned')
    core.info(response.pipelineExecutionId || '')
    core.setOutput('pipelineExecutionId', response.pipelineExecutionId || '')
  } catch (error) {
    core.setFailed(error as Error)
  }
}

export {triggerAWSCodePipeline}
