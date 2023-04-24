const LogConstants = {
    DB_LOG_ENABLED: process.env.DB_LOG_ENABLED || false,
    DEBUG_LOG_ENABLED: process.env.DEBUG_LOG_ENABLED || false,
    WARN_LOG_ENABLED: process.env.WARN_LOG_ENABLED || false,
    ACCESS_LOG_ENABLED: process.env.ACCESS_LOG_ENABLED || true,
    
    // ENV: process.env.NODE_ENV !== 'development' || true,
    ENV: true,
};


export default LogConstants;