package s3.bucket

import future.keywords.in

default allow = false

versioning_status_expected = "Enabled"

resource_type = "AWS::S3::Bucket"

metadata := {
	"id": "OPA-001",
	"title": "S3 bucket versioning has to be enabled",
	"description": "S3 bucket versioning has to be enabled",
	"allowed_values": [{"property": "S3BuckerVersioningEnabled", "required": true, "allowed_values": [versioning_status_expected]}]
}

non_compliant_resources[resource_id] {
	resource = input.Resources[resource_id]
	resource.Type == resource_type
	not resource.Properties.VersioningConfiguration.Status == versioning_status_expected
}



allow {
	count(non_compliant_resources) == 0
}

violation[message] {
	some s3_bucket in non_compliant_resources
	message = [{
		"resource": s3_bucket,
		"cft_properties": metadata.allowed_values,
		"decision": "deny",
		"policy_id": metadata.id,
		"message": metadata.description,
	}]
}

# opa eval --format pretty -i cdk.out/DemoCdkStack.template.json -d opa/aws-s3-opa.rego "data"