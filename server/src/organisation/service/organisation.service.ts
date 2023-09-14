import { prisma } from "../../utils/dbconnect"

async function createOrganisation(name: string, desc: string, contact: string, address: string): Promise<void> {
    await prisma.organization.create({
        data: {
            name: name,
            description: desc,
            contact: contact,
            address: address,
        }
    })
}

export { createOrganisation }