import * as SQLite from 'expo-sqlite'

export const tarefas = SQLite.openDatabase('tarefas.db')