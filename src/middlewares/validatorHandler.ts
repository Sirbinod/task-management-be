import { Request, Response, NextFunction } from "express";
import { validationResult, Schema, ValidationChain } from "express-validator";

function validatorHandler(schema: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schema.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, message: "Validation Error", errors: errors.array() });
    }
    next();
  };
}

export { validatorHandler };
