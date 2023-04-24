import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [User], //"src/**/**.entity{.ts,.js}" // "src/users/*.entity{.ts}"
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
