import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserModel } from '../../users/models/user.model'

export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserModel }>()
		const user = request.user

		if (!user.isAdmin) {
			throw new ForbiddenException('У вас нет прав')
		}

		return user.isAdmin
	}
}
