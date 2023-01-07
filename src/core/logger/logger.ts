import { isNil, Optional } from '@/utilities';

const LOGGER_LEVELS = {
  error: 'error',
  warn: 'warn',
  debug: 'debug',
};

const LOGGER_LEVELS_WEIGHTS = {
  [LOGGER_LEVELS.debug]: 0,
  [LOGGER_LEVELS.warn]: 100,
  [LOGGER_LEVELS.error]: 1000,
};

type LoggerLevel = keyof typeof LOGGER_LEVELS;

class Logger {
  public level: Optional<LoggerLevel> = null;

  public error(message: string, ...data: any[]) {
    this.message('warn', message, ...data);
  }

  public warn(message: string, ...data: any[]) {
    this.message('warn', message, ...data);
  }

  public debug(message: string, ...data: any[]) {
    this.message('warn', message, ...data);
  }

  private message(level: LoggerLevel, message: string, ...data: any[]) {
    if (!isNil(this.level)
      && LOGGER_LEVELS_WEIGHTS[level] >= LOGGER_LEVELS_WEIGHTS[this.level]
    ) {
      console[level](`[func-client] ${message}`, ...data);
    }
  }
}

export default new Logger();
