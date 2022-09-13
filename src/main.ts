import * as core from '@actions/core'
import {triggerAWSCodePipeline} from './trigger-aws-codepipeline'

const run = async (): Promise<void> => {
  try {
    triggerAWSCodePipeline()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
