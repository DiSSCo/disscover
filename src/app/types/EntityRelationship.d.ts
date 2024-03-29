/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface EntityRelationship {
  entityRelationshipType: string;
  /**
   * The link to the referenced resource. This could be an internal object linked through the PID or an external object
   */
  objectEntityIri: string;
  /**
   * The data time on which the relationship was established
   */
  entityRelationshipDate: string;
  /**
   * When multiple relationships are added an order can be defined
   */
  entityRelationshipOrder?: number;
  /**
   * The name of the relationship creator
   */
  entityRelationshipCreatorName?: string;
  /**
   * The PID of the creator, this could be a Orcid(user), PID(machine) or ROR(organisation)
   */
  entityRelationshipCreatorId: string;
  [k: string]: unknown;
}
