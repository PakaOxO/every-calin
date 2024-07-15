package com.everycalin.backend.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Holiday {

	private String name;

	private String date;

	@Builder
	public Holiday(String name, String date) {
		this.name = name;
		this.date = date;
	}
}
