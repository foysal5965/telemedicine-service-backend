import { Server } from 'http';
import app from './app';
import express from 'express'
import config from './app/config';

async function main(){
    const server  : Server= app.listen(config.port,()=>{
        console.log('server runnig on port ', config.port)
    })
}
main()