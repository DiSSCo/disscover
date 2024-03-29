/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Agent {
  agentRole?: string;
  agentType: string;
  agentName: string;
  agentRoleBegan?: string;
  agentRoleEnded?: string;
  agentRoleOrder?: number;
  identifiers?: Identification[];
  [k: string]: unknown;
}
export interface Identification {
  /**
   * Check DWC terms
   */
  "dwc:identificationID"?: string;
  /**
   * Unclear yet
   */
  "???:identificationType"?: string;
  /**
   * Unclear yet
   */
  "???:taxonFormula"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/verbatimIdentification
   */
  "dwc:verbatimIdentification"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/typeStatus
   */
  "dwc:typeStatus"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/identifiedBy
   */
  "dwc:identifiedBy"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/identifiedByID
   */
  "dwc:identifiedById"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/dateIdentified
   */
  "dwc:dateIdentified"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/identificationReferences
   */
  "dwc:identificationReferences"?: string;
  /**
   * If this is the accepted identification, based on https://rs.tdwg.org/dwc/terms/identificationVerificationStatus
   */
  "dwc:identificationVerificationStatus": boolean;
  /**
   * https://rs.tdwg.org/dwc/terms/identificationRemarks
   */
  "dwc:identificationRemarks"?: string;
  /**
   * Unclear yet
   */
  "???:typeDesignationType"?: string;
  /**
   * Unclear yet
   */
  "???:typeDesignatedBy"?: string;
  citations?: Citation[];
  taxonIdentifications?: {
    /**
     * See DWC Terms
     */
    "dwc:taxonID"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/scientificName
     */
    "dwc:scientificName": string;
    /**
     * https://rs.tdwg.org/dwc/terms/scientificNameAuthorship
     */
    "dwc:scientificNameAuthorship"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/nameAccordingTo
     */
    "dwc:nameAccordingTo"?: string;
    "dwc:namePublishedInYear"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/taxonRank
     */
    "dwc:taxonRank"?: string;
    /**
     * Unclear yet
     */
    "???:taxonSource"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/taxonRemarks
     */
    "dwc:taxonRemarks"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/kingdom
     */
    "dwc:kingdom"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/phylum
     */
    "dwc:phylum"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/class
     */
    "dwc:class"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/order
     */
    "dwc:order"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/family
     */
    "dwc:family"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/subfamily
     */
    "dwc:subfamily"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/genus
     */
    "dwc:genus"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/specificEpithet
     */
    "dwc:specificEpithet"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/taxonomicStatus
     */
    "dwc:taxonomicStatus"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/nomenclaturalCode
     */
    "dwc:nomenclaturalCode"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/vernacularName
     */
    "dwc:vernacularName"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/subgenus
     */
    "dwc:subgenus"?: string;
    /**
     * Unclear yet
     */
    "???:acceptedScientificName"?: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
export interface Citation {
  /**
   * https://purl.org/dc/terms/type
   */
  "dcterms:type"?: string;
  /**
   * https://purl.org/dc/terms/date
   */
  "dcterms:date"?: string;
  /**
   * https://purl.org/dc/terms/title
   */
  "dcterms:title"?: string;
  /**
   * https://purl.org/dc/elements/1.1/creator
   */
  "dcterms:creator"?: string;
  /**
   * Unclear yet
   */
  "???:citationPageNumber"?: string;
  /**
   * Unclear yet
   */
  "???:citationRemarks"?: string;
  /**
   * Unclear yet
   */
  "???:referenceType"?: string;
  /**
   * https://dublincore.org/usage/terms/history/#bibliographicCitation-002
   */
  "dcterms:bibliographicCitation"?: string;
  /**
   * Unclear yet
   */
  "???:referenceYear"?: string;
  /**
   * Unclear yet
   */
  "???:referenceIri"?: string;
  /**
   * Unclear yet
   */
  "???:isPeerReviewed"?: boolean;
  [k: string]: unknown;
}
