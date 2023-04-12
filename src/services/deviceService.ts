import {DevicesRepository} from "../repositories/devicesRepository";

export class DeviceService {
    private deviceRepository: DevicesRepository;

    constructor() {
        this.deviceRepository = new DevicesRepository
    }
    async deleteAllDevicesExceptActive(userId: string, deviceId: string) {
        return await this.deviceRepository.deleteAllExceptActive(userId, deviceId)
    }

    async deleteOneDeviceById(id: string) {
        return await this.deviceRepository.deleteOneDeviceById(id)
    }

    async createNewDevice(ip: string, title: string, payload: any) {

        const deviceTmp = {
            ip: ip,
            title: title,
            lastActiveDate: (new Date(payload.iat * 1000)).toISOString(),
            deviceId: payload.deviceId,
            userId: payload.userId
        }
        await this.deviceRepository.createNewDevice(deviceTmp)

    }
}

export const deviceService = new DeviceService()