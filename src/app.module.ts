import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ],
})
export class AppModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: "postgres",
//       host: "localhost",
//       port: 5432,
//       username: "postgres",
//       password: "1234",
//       database: "boardproject",
//       entities: [Board],
//       synchronize: true
//   }),
//     BoardsModule,
//   ],
// })
// export class AppModule {}

// const dbConfig = config.get('db');

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: dbConfig.type,
//       host: process.env.RDS_HOSTNAME || dbConfig.host,
//       port: process.env.RDS_PORT || dbConfig.port,
//       username: process.env.USERNAME || dbConfig.username,
//       password: process.env.PASSWORD || dbConfig.password,
//       database: process.env.RDS_DB_NAME || dbConfig.database,
//       entities: [Board],
//       synchronize: dbConfig.synchronize,
//   }),
//     BoardsModule,
//   ],
// })
// export class AppModule {}
