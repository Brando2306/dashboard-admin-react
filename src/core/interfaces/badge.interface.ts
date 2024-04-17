export type BadgeType =
  | 'userState'
  | 'customerState'
  | 'requestState'
  | 'requestCustomerType'
  | 'requestPriority'
  | 'auditTypeEvent'
  | 'pendingState';

export type BadgeStyle = {
  name: string;
  style: {
    'background-color': string;
    color: string;
  }
};
