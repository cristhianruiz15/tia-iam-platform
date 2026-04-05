import { Trace, TraceDetail, TraceRawResponse } from '@/src/types';

export const MOCK_TRACES_LIST: Trace[] = [
  {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf401",
    "source_system": "AVANTE",
    "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf401",
    "event_type": "iam.employee.created",
    "event_version": "1.0",
    "employee_id": "2450758422",
    "username": null,
    "store_id": "377",
    "received_at": "2025-04-08T22:41:48.870Z",
    "last_updated_at": "2026-04-02T17:10:31.014Z",
    "overall_status": "COMPLETED",
    "completed_at": "2026-04-03T10:00:00Z",
    "reprocess_count": 0,
    "expected_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "completed_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "failed_targets": [],
    "pending_targets": []
  },
  {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf403",
    "source_system": "AVANTE",
    "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf403",
    "event_type": "iam.employee.created",
    "event_version": "1.0",
    "employee_id": "2450758335",
    "username": null,
    "store_id": "377",
    "received_at": "2025-04-08T22:41:48.870Z",
    "last_updated_at": "2026-04-03T20:26:37.263Z",
    "overall_status": "PARTIAL_SUCCESS",
    "completed_at": null,
    "reprocess_count": 0,
    "expected_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "completed_targets": [
        "KEYCLOAK",
        "OID"
    ],
    "failed_targets": [
        "ACTIVE_DIRECTORY"
    ],
    "pending_targets": [
        "SMTP"
    ]
  },
  {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
    "source_system": "AVANTE",
    "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
    "event_type": "iam.employee.created",
    "event_version": "1.0",
    "employee_id": "2450758333",
    "username": "emma.hernandez",
    "store_id": "552",
    "received_at": "2025-04-08T22:41:48.870Z",
    "last_updated_at": "2026-03-31T17:54:59.826Z",
    "overall_status": "IN_PROGRESS",
    "completed_at": null,
    "reprocess_count": 0,
    "expected_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "completed_targets": [
        "ACTIVE_DIRECTORY"
    ],
    "failed_targets": [],
    "pending_targets": [
        "KEYCLOAK",
        "OID",
        "SMTP"
    ]
  },
  {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf402",
    "source_system": "AVANTE",
    "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf402",
    "event_type": "iam.employee.created",
    "event_version": "1.0",
    "employee_id": "2450758333",
    "username": null,
    "store_id": "377",
    "received_at": "2025-04-08T22:41:48.870Z",
    "last_updated_at": "2026-04-03T20:13:23.801Z",
    "overall_status": "FAILED",
    "completed_at": null,
    "reprocess_count": 0,
    "expected_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "completed_targets": [],
    "failed_targets": [
        "ACTIVE_DIRECTORY"
    ],
    "pending_targets": [
        "KEYCLOAK",
        "OID",
        "SMTP"
    ]
  },
  {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf337",
    "source_system": "AVANTE",
    "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf337",
    "event_type": "iam.employee.created",
    "event_version": "1.0",
    "employee_id": "2450758458",
    "username": null,
    "store_id": "377",
    "received_at": "2025-04-08T22:41:48.870Z",
    "last_updated_at": "2026-04-02T17:09:25.455Z",
    "overall_status": "RECEIVED",
    "completed_at": null,
    "reprocess_count": 0,
    "expected_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ],
    "completed_targets": [],
    "failed_targets": [],
    "pending_targets": [
        "ACTIVE_DIRECTORY",
        "KEYCLOAK",
        "OID",
        "SMTP"
    ]
  }
];

export const MOCK_TRACE_RAW: TraceRawResponse = {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
    "count": 8,
    "items": [
        {
            "entity_type": "EVENT",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "EVENT",
            "timestamp": "2025-04-08T22:41:48.870Z",
            "priority": 0,
            "attempt_id": null,
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "source_system": "AVANTE",
                "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "event_type": "iam.employee.created",
                "event_version": "1.0",
                "employee_id": "2450758333",
                "username": "emma.hernandez",
                "store_id": "552",
                "received_at": "2025-04-08T22:41:48.870Z",
                "last_updated_at": "2026-03-31T17:54:59.826Z",
                "expected_targets": [
                    "ACTIVE_DIRECTORY",
                    "KEYCLOAK",
                    "OID",
                    "SMTP"
                ],
                "completed_targets": [
                    "ACTIVE_DIRECTORY"
                ],
                "failed_targets": [],
                "pending_targets": [
                    "KEYCLOAK",
                    "OID",
                    "SMTP"
                ],
                "overall_status": "IN_PROGRESS",
                "version": 4,
                "reprocess_count": 0,
                "completed_at": null,
                "ttl": null
            }
        },
        {
            "entity_type": "STEP",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
            "timestamp": "2026-03-31T02:21:57.380Z",
            "priority": 1,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "step_id": "488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                "system": "ACTIVE_DIRECTORY",
                "step_status": "SUCCESS",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                "started_at": "2026-03-31T02:21:57.380Z",
                "ended_at": "2026-03-31T02:27:37.304Z",
                "duration_ms": 339924,
                "lambda_name": "useast1-lambda-keycloak-sync-avt",
                "lambda_request_id": "488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                "queue_name": "aws-sqs-avante-employees-active-directory",
                "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                "error_type": null,
                "error_code": null,
                "error_message_summary": null
            }
        },
        {
            "entity_type": "TIMELINE",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T02:27:37.304Z",
            "timestamp": "2026-03-31T02:27:37.304Z",
            "priority": 3,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "event_timestamp": "2026-03-31T02:27:37.304Z",
                "timeline_type": "STEP_COMPLETED",
                "system": "ACTIVE_DIRECTORY",
                "status": "SUCCESS",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                "description": "Procesamiento exitoso en ACTIVE_DIRECTORY",
                "metadata": null
            }
        },
        {
            "entity_type": "STEP",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
            "timestamp": "2026-03-31T17:54:57.964Z",
            "priority": 1,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "step_id": "3486fc28-3e32-4358-a39b-8a4ed4db3943",
                "system": "ACTIVE_DIRECTORY",
                "step_status": "SUCCESS",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                "started_at": "2026-03-31T17:54:57.964Z",
                "ended_at": "2026-03-31T17:55:00.087Z",
                "duration_ms": 2123,
                "lambda_name": "useast1-lambda-keycloak-sync-avt",
                "lambda_request_id": "3486fc28-3e32-4358-a39b-8a4ed4db3943",
                "queue_name": "aws-sqs-avante-employees-active-directory",
                "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                "error_type": null,
                "error_code": null,
                "error_message_summary": null
            }
        },
        {
            "entity_type": "TIMELINE",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:00.087Z",
            "timestamp": "2026-03-31T17:55:00.087Z",
            "priority": 3,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "event_timestamp": "2026-03-31T17:55:00.087Z",
                "timeline_type": "STEP_COMPLETED",
                "system": "ACTIVE_DIRECTORY",
                "status": "SUCCESS",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                "description": "Procesamiento exitoso en ACTIVE_DIRECTORY",
                "metadata": null
            }
        },
        {
            "entity_type": "STEP",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
            "timestamp": "2026-03-31T17:55:46.023Z",
            "priority": 1,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "step_id": "b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                "system": "ACTIVE_DIRECTORY",
                "step_status": "FAILED",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                "started_at": "2026-03-31T17:55:46.023Z",
                "ended_at": "2026-03-31T17:55:46.695Z",
                "duration_ms": 672,
                "lambda_name": "useast1-lambda-keycloak-sync-avt",
                "lambda_request_id": "b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                "queue_name": "aws-sqs-avante-employees-active-directory",
                "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                "error_type": "UNKNOWN_ERROR",
                "error_code": "UNK-001",
                "error_message_summary": "Usuario 2450758333 ya existe en Active Directory, evento de Creacion Fallido"
            }
        },
        {
            "entity_type": "ERROR",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "ERROR#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:46.695Z",
            "timestamp": "2026-03-31T17:55:46.695Z",
            "priority": 2,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "system": "ACTIVE_DIRECTORY",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                "occurred_at": "2026-03-31T17:55:46.695Z",
                "error_type": "UNKNOWN_ERROR",
                "error_code": "UNK-001",
                "error_message_summary": "Usuario 2450758333 ya existe en Active Directory, evento de Creacion Fallido"
            }
        },
        {
            "entity_type": "TIMELINE",
            "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
            "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:46.695Z",
            "timestamp": "2026-03-31T17:55:46.695Z",
            "priority": 3,
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
            "data": {
                "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                "event_timestamp": "2026-03-31T17:55:46.695Z",
                "timeline_type": "STEP_COMPLETED",
                "system": "ACTIVE_DIRECTORY",
                "status": "FAILED",
                "attempt": 1,
                "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                "description": "Procesamiento fallido en ACTIVE_DIRECTORY",
                "metadata": null
            }
        }
    ]
};

export const MOCK_TRACE_DETAIL: TraceDetail = {
    "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
    "header": {
        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
        "source_system": "AVANTE",
        "source_event_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
        "event_type": "iam.employee.created",
        "event_version": "1.0",
        "employee_id": "2450758333",
        "username": "emma.hernandez",
        "store_id": "552",
        "received_at": "2025-04-08T22:41:48.870Z",
        "last_updated_at": "2026-03-31T17:54:59.826Z",
        "expected_targets": [
            "ACTIVE_DIRECTORY",
            "KEYCLOAK",
            "OID",
            "SMTP"
        ],
        "completed_targets": [
            "ACTIVE_DIRECTORY"
        ],
        "failed_targets": [],
        "pending_targets": [
            "KEYCLOAK",
            "OID",
            "SMTP"
        ],
        "overall_status": "IN_PROGRESS",
        "version": 4,
        "reprocess_count": 0,
        "completed_at": null,
        "ttl": null
    },
    "summary": {
        "attempt_groups_count": 3,
        "max_attempt": "1",
        "retry_count": "0",
        "manual_reprocess_count": "0",
        "has_failures": true,
        "failed_systems": [
            "ACTIVE_DIRECTORY"
        ],
        "last_failed_system": "ACTIVE_DIRECTORY",
        "last_error_code": "UNK-001",
        "last_error_type": "UNKNOWN_ERROR"
    },
    "attempt_groups": [
        {
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
            "system": "ACTIVE_DIRECTORY",
            "attempt": "1",
            "started_at": "2026-03-31T02:21:57.380Z",
            "ended_at": "2026-03-31T02:27:37.304Z",
            "final_step_status": "SUCCESS",
            "items": [
                {
                    "entity_type": "STEP",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                    "timestamp": "2026-03-31T02:21:57.380Z",
                    "priority": 1,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "step_id": "488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                        "system": "ACTIVE_DIRECTORY",
                        "step_status": "SUCCESS",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                        "started_at": "2026-03-31T02:21:57.380Z",
                        "ended_at": "2026-03-31T02:27:37.304Z",
                        "duration_ms": 339924,
                        "lambda_name": "useast1-lambda-keycloak-sync-avt",
                        "lambda_request_id": "488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                        "queue_name": "aws-sqs-avante-employees-active-directory",
                        "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                        "error_type": null,
                        "error_code": null,
                        "error_message_summary": null
                    }
                },
                {
                    "entity_type": "TIMELINE",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T02:27:37.304Z",
                    "timestamp": "2026-03-31T02:27:37.304Z",
                    "priority": 3,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "event_timestamp": "2026-03-31T02:27:37.304Z",
                        "timeline_type": "STEP_COMPLETED",
                        "system": "ACTIVE_DIRECTORY",
                        "status": "SUCCESS",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#488d201a-e0aa-4c44-89e2-22ad53c59ebb",
                        "description": "Procesamiento exitoso en ACTIVE_DIRECTORY",
                        "metadata": null
                    }
                }
            ]
        },
        {
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
            "system": "ACTIVE_DIRECTORY",
            "attempt": "1",
            "started_at": "2026-03-31T17:54:57.964Z",
            "ended_at": "2026-03-31T17:55:00.087Z",
            "final_step_status": "SUCCESS",
            "items": [
                {
                    "entity_type": "STEP",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                    "timestamp": "2026-03-31T17:54:57.964Z",
                    "priority": 1,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "step_id": "3486fc28-3e32-4358-a39b-8a4ed4db3943",
                        "system": "ACTIVE_DIRECTORY",
                        "step_status": "SUCCESS",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                        "started_at": "2026-03-31T17:54:57.964Z",
                        "ended_at": "2026-03-31T17:55:00.087Z",
                        "duration_ms": 2123,
                        "lambda_name": "useast1-lambda-keycloak-sync-avt",
                        "lambda_request_id": "3486fc28-3e32-4358-a39b-8a4ed4db3943",
                        "queue_name": "aws-sqs-avante-employees-active-directory",
                        "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                        "error_type": null,
                        "error_code": null,
                        "error_message_summary": null
                    }
                },
                {
                    "entity_type": "TIMELINE",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:00.087Z",
                    "timestamp": "2026-03-31T17:55:00.087Z",
                    "priority": 3,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "event_timestamp": "2026-03-31T17:55:00.087Z",
                        "timeline_type": "STEP_COMPLETED",
                        "system": "ACTIVE_DIRECTORY",
                        "status": "SUCCESS",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#3486fc28-3e32-4358-a39b-8a4ed4db3943",
                        "description": "Procesamiento exitoso en ACTIVE_DIRECTORY",
                        "metadata": null
                    }
                }
            ]
        },
        {
            "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
            "system": "ACTIVE_DIRECTORY",
            "attempt": "1",
            "started_at": "2026-03-31T17:55:46.023Z",
            "ended_at": "2026-03-31T17:55:46.695Z",
            "final_step_status": "FAILED",
            "items": [
                {
                    "entity_type": "STEP",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "STEP#ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                    "timestamp": "2026-03-31T17:55:46.023Z",
                    "priority": 1,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "step_id": "b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                        "system": "ACTIVE_DIRECTORY",
                        "step_status": "FAILED",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                        "started_at": "2026-03-31T17:55:46.023Z",
                        "ended_at": "2026-03-31T17:55:46.695Z",
                        "duration_ms": 672,
                        "lambda_name": "useast1-lambda-keycloak-sync-avt",
                        "lambda_request_id": "b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                        "queue_name": "aws-sqs-avante-employees-active-directory",
                        "message_id": "583819f1-e96c-41a8-8296-44dfe6e52772",
                        "error_type": "UNKNOWN_ERROR",
                        "error_code": "UNK-001",
                        "error_message_summary": "Usuario 2450758333 ya existe en Active Directory, evento de Creacion Fallido"
                    }
                },
                {
                    "entity_type": "ERROR",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "ERROR#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:46.695Z",
                    "timestamp": "2026-03-31T17:55:46.695Z",
                    "priority": 2,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "system": "ACTIVE_DIRECTORY",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                        "occurred_at": "2026-03-31T17:55:46.695Z",
                        "error_type": "UNKNOWN_ERROR",
                        "error_code": "UNK-001",
                        "error_message_summary": "Usuario 2450758333 ya existe en Active Directory, evento de Creacion Fallido"
                    }
                },
                {
                    "entity_type": "TIMELINE",
                    "pk": "TRACE#522adbff-4730-5e65-b4b7-bb90ef5cf333",
                    "sk": "TIMELINE#ACTIVE_DIRECTORY#ATTEMPT#0001#2026-03-31T17:55:46.695Z",
                    "timestamp": "2026-03-31T17:55:46.695Z",
                    "priority": 3,
                    "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                    "data": {
                        "trace_id": "522adbff-4730-5e65-b4b7-bb90ef5cf333",
                        "event_timestamp": "2026-03-31T17:55:46.695Z",
                        "timeline_type": "STEP_COMPLETED",
                        "system": "ACTIVE_DIRECTORY",
                        "status": "FAILED",
                        "attempt": 1,
                        "attempt_id": "ACTIVE_DIRECTORY#ATTEMPT#0001#b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5",
                        "description": "Procesamiento fallido en ACTIVE_DIRECTORY",
                        "metadata": null
                    }
                }
            ]
        }
    ],
    "ungrouped_items": [],
    "raw_count": 8
};
