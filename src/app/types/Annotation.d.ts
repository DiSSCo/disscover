/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Information about the Annotation data model. This model has been based on the W3C Web Annotation model
 */
export interface Annotation {
  /**
   * The unique identifier (handle) of the Annotation object
   */
  "@id": string;
  /**
   * The type of the object, in this case ods:Annotation
   */
  "@type": "ods:Annotation";
  /**
   * The handle of the annotation. It is a unique identifier for the annotation. It is composed of the handle of the document followed by a slash and a unique identifier for the annotation.
   */
  "ods:ID": string;
  /**
   * The status of the Digital Object.
   */
  "ods:status"?: "ods:Draft" | "ods:Active" | "ods:Tombstone";
  /**
   * Handle of the job record, if the annotation was produced by a Machine Annotation Service, only filled when annotation was created by a MAS
   */
  "ods:jobID"?: string;
  /**
   * The type of the annotation. It is always ods:Annotation. https://www.w3.org/TR/rdf12-schema/#ch_type
   */
  "rdf:type": "ods:Annotation";
  /**
   * The version of the object, each change generates a new version
   */
  "ods:version": number;
  /**
   * The motivation for the annotation. Based on a selection of https://www.w3.org/TR/annotation-model/#motivation-and-purpose. The motivation ods:adding is added for DiSSCo's purposes.
   */
  "oa:motivation": "ods:adding" | "ods:deleting" | "oa:assessing" | "oa:editing" | "oa:commenting";
  /**
   * Describes the reason for the annotation. https://www.w3.org/TR/annotation-vocab/#motivatedby
   */
  "oa:motivatedBy"?: string;
  "oa:hasTarget": AnnotationTarget;
  "oa:hasBody": AnnotationBody;
  "dcterms:creator": Agent;
  /**
   * The date and time when the annotation was created. https://purl.org/dc/terms/created
   */
  "dcterms:created": string;
  /**
   * The date and time when the annotation was last modified, generating a new version. https://purl.org/dc/terms/modified
   */
  "dcterms:modified": string;
  /**
   * The date and time when the annotation was generated. https://purl.org/dc/terms/issued
   */
  "dcterms:issued": string;
  "as:generator": Agent1;
  /**
   * The average rating based on multiple ratings or reviews
   */
  "schema:AggregateRating"?: {
    /**
     * Indicates which type of aggregateRating we are using.
     */
    "@type": "schema:AggregateRating";
    /**
     * The count of total number of ratings. https://schema.org/ratingCount
     */
    "schema:ratingCount": number;
    /**
     * The rating for the content. https://schema.org/ratingValue
     */
    "schema:ratingValue": number;
  };
  /**
   * Internally generated PID to identify the batch the annotation was generated by
   */
  "ods:batchID"?: string;
  /**
   * For batching only. Links annotation to batchMetadata provided in a batch event. If present, must correspond to an ods:placeInBatch in the batch metadata
   */
  "ods:placeInBatch"?: number;
  /**
   * The merging status of the annotation. Only present when motivation is ods:adding or oa:editing
   */
  "ods:mergingDecisionStatus"?: "ods:Pending" | "ods:Rejected" | "ods:Approved";
  /**
   * The date and time when the annotation was merging state was changed. Only present when motivation is ods:adding or oa:editing
   */
  "ods:mergingStateChangeDate"?: string;
  "ods:MergingStateChangedBy"?: Agent2;
  "ods:TombstoneMetadata"?: TombstoneMetadata;
}
/**
 * Indicates the particular object and part of the object on which the annotation has been made.
 */
export interface AnnotationTarget {
  /**
   * This is the PID of the target object. Valid targets are the Digital Specimen, Digital Media Object or another annotation.
   */
  "@id": string;
  /**
   * The type of the target object
   */
  "@type": string;
  /**
   * This is the PID of the target object. Valid targets are the Digital Specimen, Digital Media Object or another annotation.
   */
  "ods:ID": string;
  /**
   * This is the handle to the type of the target object.
   */
  "ods:type": string;
  /**
   * Optional field to indicate the part of the target object that is being annotated. It can be a field, a class or a region of interest.
   */
  "oa:hasSelector"?:
    | {
        /**
         * A selector for an individual field.
         */
        "@type": "ods:FieldSelector";
        /**
         * The full jsonPath in block notation of the field being annotated. Following: https://goessner.net/articles/JsonPath/index.html#e2
         */
        "ods:field": string;
      }
    | {
        /**
         * A selector for an individual class.
         */
        "@type": "ods:ClassSelector";
        /**
         * The full jsonPath in block notation of the class being annotated. Following: https://goessner.net/articles/JsonPath/index.html#e2
         */
        "ods:class": string;
      }
    | {
        /**
         * A selector for an specific Region of Interest (Roi). Only applicable on media objects.
         */
        "@type": "oa:FragmentSelector";
        /**
         * https://ac.tdwg.org/termlist/2023-02-24#ac_hasROI
         */
        "ac:hasROI": {
          /**
           * https://ac.tdwg.org/termlist/2023-02-24#ac_xFrac
           */
          "ac:xFrac": number;
          /**
           * https://ac.tdwg.org/termlist/2023-02-24#ac_yFrac
           */
          "ac:yFrac": number;
          /**
           * https://ac.tdwg.org/termlist/2023-02-24#ac_widthFrac
           */
          "ac:widthFrac": number;
          /**
           * https://ac.tdwg.org/termlist/2023-02-24#ac_heightFrac
           */
          "ac:heightFrac": number;
        };
        /**
         * https://purl.org/dc/terms/conformsTo
         */
        "dcterms:conformsTo": string;
      };
}
/**
 * The body of the annotation contains the specific value of the annotation
 */
export interface AnnotationBody {
  /**
   * https://www.w3.org/TR/annotation-vocab/#textualbody
   */
  "@type": string;
  /**
   * An array of multiple values in string representation specific for the particular selector
   */
  "oa:value": string[];
  /**
   * Indicates how the value came to be. https://purl.org/dc/terms/references
   */
  "dcterms:references"?: string;
  /**
   * A score between 0 and 1 indicating the confidence in the value. 1 is the highest confidence and 0 is the lowest.
   */
  "ods:score"?: number;
}
/**
 * Contains an ods:Agent object
 */
export interface Agent {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
/**
 * Based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
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
   * The type of the identifier, https://purl.org/dc/elements/1.1/title
   */
  "dcterms:title": string;
  /**
   * The local title of the identifier
   */
  "ods:localTitle"?: string;
  /**
   * The value for the identifier, https://purl.org/dc/terms/identifier
   */
  "dcterms:identifier": string;
  /**
   * Mime type of content returned by identifier in case the identifier is resolvable. https://purl.org/dc/terms/format
   */
  "dcterms:format"?: string;
  /**
   * Keywords qualifying the identifier https://purl.org/dc/terms/subject
   */
  "dcterms:subject"?: string;
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is part of the barcode or nfc chip
   */
  "ods:isBarcodeOrNFC"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:isIDPersistent"?: boolean;
}
/**
 * Object containing information on who generated the object. Generated is here seen as who stored/indexed the object. In most case this will be the annotation-processing-service. Contains an ods:Agent object.
 */
export interface Agent1 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
/**
 * Object containing information on who changed the merging state of the annotation. Only present when motivation is ods:adding or oa:editing. Contains an ods:Agent object.
 */
export interface Agent2 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
/**
 * Object containing the tombstone metadata of the object. Only present when ods:status is ods:Tombstone
 */
export interface TombstoneMetadata {
  /**
   * The type of the record, in this case a ods:Tombstone
   */
  "@type": "ods:Tombstone";
  /**
   * Timestamp the Digital Object was tombstoned and no longer active.
   */
  "ods:tombstoneDate": string;
  /**
   * A reason why the Digital Object was tombstoned
   */
  "ods:tombstoneText": string;
  "ods:TombstonedByAgent": Agent3;
  /**
   * The PIDs of the object the tombstoned object is related to
   */
  "ods:hasRelatedPID"?: {
    /**
     * The PID of the related object
     */
    "ods:ID"?: string;
    /**
     * The type of relationship between the tombstoned object and the related object
     */
    "ods:relationshipType"?: string;
    [k: string]: unknown;
  }[];
}
/**
 * The agent who tombstoned the object, contains an ods:Agent object
 */
export interface Agent3 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
