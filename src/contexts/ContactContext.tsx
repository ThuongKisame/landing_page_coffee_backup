import { createContext, useEffect, useMemo, useState } from 'react';

import { getContacts } from '@/libs/getData';

type ContactProviderProps = {
  children: React.ReactNode;
};

export interface Address {
  area: string;
  addresses: {
    address: string;
    linkAddress: string;
    status: boolean;
  }[];
}

export interface SocialLink {
  name: string;
  link: string;
  description: string;
  status: boolean;
}

type ContactContextType = {
  phoneNumber: string;
  title: string;
  description: string;
  gmail: string;
  listAddress?: Address[];
  listSocial?: SocialLink[];
  isLoading: boolean;
};

export const ContactContext = createContext<ContactContextType>({
  phoneNumber: '',
  title: '',
  description: '',
  gmail: '',
  listAddress: [],
  listSocial: [],
  isLoading: false,
});

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<ContactContextType>({
    phoneNumber: '',
    title: '',
    description: '',
    gmail: '',
    listAddress: [],
    listSocial: [],
    isLoading,
  });

  useEffect(() => {
    getContacts()
      .then((data) => {
        const contactsApi = data ?? [];
        /* eslint-disable */
        const contactsConvert = contactsApi.map((item: any) => ({
          phoneNumber: item?.phoneNumber,
          gmail: item?.gmail,
          title: item?.title,
          description: item?.description,
          listAddress: item?.listAddress,
          listSocial: item?.listSocial,
          isLoading: false,
        }));
        /* eslint-enable */
        setContacts(contactsConvert[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const memoizedContacts = useMemo(() => contacts, [contacts]);

  return (
    <ContactContext.Provider value={memoizedContacts}>
      {children}
    </ContactContext.Provider>
  );
};
