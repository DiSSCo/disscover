/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Object used to describe identifiers of a Digital Object, based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
 */
export interface Identifier {
  /**
   * The identifier for the Identifier object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Identifier
   */
  "@type": "ods:Identifier";
  /**
   * A name for the identifier
   */
  "dcterms:title": string;
  /**
   * The type of the value in the `dcterms:identifier` field
   */
  "dcterms:type"?:
    | "ARK"
    | "arXiv"
    | "bibcode"
    | "DOI"
    | "EAN13"
    | "EISSN"
    | "Handle"
    | "IGSN"
    | "ISBN"
    | "ISSN"
    | "ISTC"
    | "LISSN"
    | "LSID"
    | "PMID"
    | "PURL"
    | "UPC"
    | "URL"
    | "URN"
    | "w3id"
    | "UUID"
    | "Other"
    | "Locally unique identifier";
  /**
   * The value for the identifier
   */
  "dcterms:identifier": string;
  /**
   * All possible mime types of content that can be returned by identifier in case the identifier is resolvable. Plain UUIDs for example do not have a dc:format return type, as they are not resolvable on their own. For a list of MIME types see the list maintained by IANA: http://www.iana.org/assignments/media-types/index.html, in particular the text http://www.iana.org/assignments/media-types/text/ and application http://www.iana.org/assignments/media-types/application/ types. Frequently used values are text/html, text/xml, application/rdf+xml, application/json
   */
  "dcterms:format"?: string[];
  /**
   * Additional keywords that the publisher may prefer to be attached to the identifier
   */
  "dcterms:subject"?: string[];
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:gupriLevel"?:
    | "LocallyUniqueStable"
    | "GloballyUniqueStable"
    | "GloballyUniqueStableResolvable"
    | "GloballyUniqueStablePersistentResolvable"
    | "GloballyUniqueStablePersistentResolvableFDOCompliant";
  /**
   * Indicates the status of the identifier
   */
  "ods:identifierStatus"?: "Preferred" | "Alternative" | "Superseded";
}
