import { promises } from 'fs';

export async function getSqlFromFile(sqlFile: string) {
  const fileBuffer = await promises.readFile(sqlFile);
  const sql = fileBuffer.toString();
	return sql;
}
