import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
// import {triggerAWSCodePipeline} from '../src/trigger-aws-codepipeline'

// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10)
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

// Test with error
// Test with success

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_AWS_REGION'] = 'INPUT_AWS_REGION'
  process.env['INPUT_AWS_ACCESS_KEY'] = 'INPUT_AWS_ACCESS_KEY'
  process.env['INPUT_AWS_SECRET_KEY'] = 'INPUT_AWS_SECRET_KEY'
  process.env['INPUT_PIPELINE_NAME'] = 'INPUT_PIPELINE_NAME'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
