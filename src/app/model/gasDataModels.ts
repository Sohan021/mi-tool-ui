export class GasDataApiResponseDto {
  mainlineLinepack?: GasMainlineLinepackDto;
  capacityRemaining?: GasDataDto;
  gasServices?: GasServicesDto;
}
export class GasMainlineLinepackDto {
  prairiesLine?: string;
  northernOntarioLine?: string;
  easternOntarioTriangle?: string;
  comment?: string;
}
export class GasDataDto {
  prairiesLine?: string;
  northernOntarioLine?: string;
  deliveriesEnteringDawn?: string;
  receiptsLeavingDawn?: string;
  parkwayLateralGLGTBHTBO?: string;
  northernOntarioLineParkwayLat?: string;
  unionKirkwallTBO?: string;
  kirkwallLateral?: string;
  chippawaReceipts?: string;
  niagaraFallsReceipts?: string;
  eDA?: string;
  iroquoisDeliveries?: string;
  iroquoisReceipts?: string;
  downstreamStn148Combined?: string;
  downstreamStn148ExcludeTQM?: string;
  downstreamStn148IntoTQM?: string;
  lachenaie?: string;
  eastHereford?: string;
  sSMDA?: string;
  comment?: string;
}
export class GasServicesDto {
  serviceTitle?: GasDataDto;
  fT_STS?: GasDataDto;
  ftd?: GasDataDto;
  iT_STSO_PAL_LBA?: GasDataDto;
}
