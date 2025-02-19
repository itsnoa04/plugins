import { CreateServerDockerComposeParams } from "@amplication/code-gen-types";
import { DataSource, DataSourceProvider } from "prisma-schema-dsl-types";

const mongodbVolumeName = "mongo";

export const updateDockerComposeProperties: CreateServerDockerComposeParams["updateProperties"] =
  [
    {
      services: {
        server: {
          environment: {
            DB_URL: "mongodb://${DB_USER}:${DB_PASSWORD}@db:27017",
          },
        },
        db: {
          image: "mongo",
          ports: ["${DB_PORT}:27017"],
          environment: {
            MONGO_INITDB_ROOT_USERNAME: "${DB_USER}",
            MONGO_INITDB_ROOT_PASSWORD: "${DB_PASSWORD}",
          },
          volumes: [`${mongodbVolumeName}:/var/lib/mongosql/data`],
        },
      },
      volumes: {
        [mongodbVolumeName]: null,
      },
    },
  ];

export const dataSource: DataSource = {
  name: "mongo",
  provider: DataSourceProvider.MongoDB,
  url: {
    name: "DB_URL",
  },
};
