interface DbOptions {
	user: string;
	password: string;
	database: string;
	connection: any;
	pool: any;
	port: number;
    logger?: any;
    debug?: boolean;
    sshScript: string;
}