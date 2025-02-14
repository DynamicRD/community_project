package com.project.member.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SnsInfo {
	private String id;
    private String email;
    
    @JsonProperty("verified_email")  // JSON에서 "verified_email"을 "verifiedEmail"로 매핑
    private boolean verifiedEmail;

    @JsonProperty("given_name") // JSON에서 "given_name"을 "givenName"으로 매핑
    private String givenName;

    @JsonProperty("family_name") // JSON에서 "family_name"을 "familyName"으로 매핑
    private String familyName;

    private String name;
    private String picture;
}
