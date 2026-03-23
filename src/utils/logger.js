const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

function formatTime() {
  return new Date().toISOString();
}

function formatLog(level, message, data = null) {
  const log = {
    timestamp: formatTime(),
    level,
    message,
    ...(data && { data })
  };
  return JSON.stringify(log);
}

export const logger = {
  error: (message, data = null) => {
    console.error(formatLog(LOG_LEVELS.ERROR, message, data));
  },
  
  warn: (message, data = null) => {
    console.warn(formatLog(LOG_LEVELS.WARN, message, data));
  },
  
  info: (message, data = null) => {
    console.log(formatLog(LOG_LEVELS.INFO, message, data));
  },
  
  debug: (message, data = null) => {
    if (process.env.DEBUG === 'true') {
      console.debug(formatLog(LOG_LEVELS.DEBUG, message, data));
    }
  }
};
