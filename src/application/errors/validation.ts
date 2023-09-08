export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const message = fieldName === undefined
      ? 'Field required'
      : `The field ${fieldName} is required`
    super(message)
    this.name = "ServerError"
  }
}

export class InvalidMymeTypeError extends Error {
  constructor(allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMymeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor(maxSizeInMb: number) {
    super(`File upload limit is: ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

