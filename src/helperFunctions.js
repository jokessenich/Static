export const getNumOfRemedies=(remedies=[], maladyId)=>(
    (!maladyId)?
    remedies:
    remedies.filter(remedy=> remedy.remedy_malady === maladyId)
)