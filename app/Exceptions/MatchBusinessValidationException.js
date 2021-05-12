'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions');

class MatchBusinessValidationException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, {request, response}) {
    response.status(error.status).json({
      message: error.message,
    })
  }
}

module.exports = MatchBusinessValidationException;
