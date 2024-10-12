import { ApiResponse } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";

export const ApiAuth = (() => {
    return applyDecorators(
         ApiResponse({
            status:401,
            description: "Mising or invalid token"
          }),
          ApiResponse({
            status:401,
            description: "Mising role"
          }),
          ApiResponse({
            status:500,
            description: "server error"
          })
    )
})
