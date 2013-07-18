package org.anttix.example.shj.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
public class SupportCase implements Serializable {
	private static final long serialVersionUID = 1L;

	public enum Status {
		PENDING,
		INVALID,
		ACCEPTED,
		RESOLVED
	}

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;

	@NotNull
	private String description;

	@NotNull
	private Status status;
}
