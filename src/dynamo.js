
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand
} from '@aws-sdk/lib-dynamodb';
import { UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
  }
});
const docClient = DynamoDBDocumentClient.from(client);


export async function scanTodos() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: 'Todo' })
  );
  return Items || [];
}


export async function createTodo(item) {
  await docClient.send(
    new PutCommand({ TableName: 'Todo', Item: item })
  );
}

export async function toggleTodoCompleted(id, completed) {
    await docClient.send(
      new UpdateCommand({
        TableName: 'Todo',
        Key: { id },
        UpdateExpression: 'set completed = :c',
        ExpressionAttributeValues: {
          ':c': completed
        }
      })
    );
  }
  
  export async function deleteTodo(id) {
    await docClient.send(
      new DeleteCommand({
        TableName: 'Todo',
        Key: { id }
      })
    );
  }
  