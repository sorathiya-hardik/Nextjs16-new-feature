import { NextRequest, NextResponse } from "next/server";

// Type definitions
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}

interface SuccessResponse {
  success: true;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

// Simulated database (in real app, use actual database)
const users = new Map<
  string,
  { id: string; name: string; email: string; password: string }
>();

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }
  return { valid: true };
}

function validateName(name: string): { valid: boolean; message?: string } {
  if (name.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long" };
  }
  if (name.length > 50) {
    return { valid: false, message: "Name must not exceed 50 characters" };
  }
  return { valid: true };
}

// Hash password (simulated - in production use bcrypt)
async function hashPassword(password: string): Promise<string> {
  // In production: const hash = await bcrypt.hash(password, 10);
  return `hashed_${password}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: RegisterRequestBody;

    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json<ErrorResponse>(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    // Validate required fields
    const validationErrors: ValidationError[] = [];

    if (!body.name) {
      validationErrors.push({ field: "name", message: "Name is required" });
    } else {
      const nameValidation = validateName(body.name);
      if (!nameValidation.valid) {
        validationErrors.push({
          field: "name",
          message: nameValidation.message!,
        });
      }
    }

    if (!body.email) {
      validationErrors.push({ field: "email", message: "Email is required" });
    } else if (!validateEmail(body.email)) {
      validationErrors.push({
        field: "email",
        message: "Invalid email format",
      });
    }

    if (!body.password) {
      validationErrors.push({
        field: "password",
        message: "Password is required",
      });
    } else {
      const passwordValidation = validatePassword(body.password);
      if (!passwordValidation.valid) {
        validationErrors.push({
          field: "password",
          message: passwordValidation.message!,
        });
      }
    }

    // Return validation errors
    if (validationErrors.length > 0) {
      return NextResponse.json<ErrorResponse>(
        { error: "Validation failed", details: validationErrors },
        { status: 400 },
      );
    }

    // Check if user already exists
    const emailLower = body.email.toLowerCase();
    if (users.has(emailLower)) {
      return NextResponse.json<ErrorResponse>(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Create user
    const userId = crypto.randomUUID();
    const newUser = {
      id: userId,
      name: body.name.trim(),
      email: emailLower,
      password: hashedPassword,
    };

    // Save to "database"
    users.set(emailLower, newUser);

    // Return success response (exclude password)
    return NextResponse.json<SuccessResponse>(
      {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // Log error (in production, use proper logging service)
    console.error("Registration error:", error);

    // Return generic error response
    return NextResponse.json<ErrorResponse>(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
