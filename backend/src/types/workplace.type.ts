type WorkplaceType = {
  city: string;
  complement?: string;
  phones: { phone: string; isPhoneWhatsapp: boolean }[];
  street: string;
  streetNumber: string;
  phone1Id?: number;
  phone2Id?: number;
};

export default WorkplaceType;
